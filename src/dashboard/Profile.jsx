"use client"

import { useEffect, useState } from "react"
import { User, Save, Camera, Lock, Eye, EyeOff } from "lucide-react"
import cookie from "js-cookie"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    dateOfBirth: "",
    gender: "",
    admin_image: null,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [activeTab, setActiveTab] = useState("profile")
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/adminProfile`, {
          withCredentials: true,
        })

        console.log("Profile data:", res)

        if (res) {
          const data = res.data.data
          console.log("Mapped profile data:", data)
          setProfile({
            name: data.name || "",
            email: data.email || "",
            mobile: data.mobile || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            country: data.country || "",
            dateOfBirth: data.dateOfBirth || "",
            gender: data.gender || "",
            admin_image: data.admin_image || null,
          })
        } else {
          setErrors({ fetch: res.message || "Failed to load profile data" })
          toast.error(res.message || "Failed to load profile data")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        setErrors({ fetch: "Failed to load profile data" })
        toast.error("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validateProfile = () => {
    const newErrors = {}

    if (!profile.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!profile.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10}$/.test(profile.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Mobile number should be 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors = {}

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = async () => {
    if (!validateProfile()) {
      return
    }

    try {
      setLoading(true)
      const toastId = toast.loading('Updating profile...')

      const formData = new FormData()
      formData.append("name", profile.name)
      formData.append("email", profile.email)
      formData.append("mobile", profile.mobile)
      formData.append("address", profile.address)
      formData.append("city", profile.city)
      formData.append("state", profile.state)
      formData.append("country", profile.country)
      formData.append("dateOfBirth", profile.dateOfBirth)
      formData.append("gender", profile.gender)

      if (selectedFile) {
        formData.append("admin_image", selectedFile)
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE}/update_profile`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      })

      const responseData = await response.json()
      console.log("Profile updated:", responseData)

      if (responseData.success) {
        setIsEditing(false)
        setSelectedFile(null)
        toast.success("Profile updated successfully!", { id: toastId })
        
        if (responseData.data) {
          const data = responseData.data
          setProfile((prev) => ({
            ...prev,
            admin_image: data.admin_image || prev.admin_image,
          }))
        }
      } else {
        toast.error(responseData.message || "Failed to update profile. Please try again.", { id: toastId })
        setErrors({ save: responseData.message || "Failed to update profile. Please try again." })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.")
      setErrors({ save: "Failed to update profile. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const handleSavePassword = async (e) => {
    e.preventDefault()
    if (!validatePassword()) {
      return
    }

    try {
      setLoading(true)
      const toastId = toast.loading('Updating password...')

      const response = await fetch(`${import.meta.env.VITE_API_BASE}/adminChange_Pass`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookie.get("devjwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pass: passwordForm.currentPassword,
          newpass: passwordForm.newPassword,
        }),
        credentials: "include",
      })

      const responseData = await response.json()
      console.log("Password changed:", responseData)

      if (responseData.success) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        setErrors({})
        toast.success("Password changed successfully!", { id: toastId })
      } else {
        toast.error(responseData.message || "Failed to change password. Please check your current password.", { id: toastId })
        setErrors({
          password: responseData.message || "Failed to change password. Please check your current password.",
        })
      }
    } catch (error) {
      console.error("Error changing password:", error)
      toast.error("Failed to change password. Please try again.")
      setErrors({ password: "Failed to change password. Please check your current password." })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ avatar: "Image size should be less than 5MB" })
        toast.error("Image size should be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setErrors({ avatar: "Please select a valid image file" })
        toast.error("Please select a valid image file")
        return
      }

      setSelectedFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, admin_image: reader.result }))
        if (errors.avatar) {
          setErrors((prev) => ({ ...prev, avatar: "" }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading && !profile.name) {
    return (
      <div className=" bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Management</h2>

      {(errors.fetch || errors.save || errors.password) && (
        <div className="max-w-4xl mx-auto mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.fetch || errors.save || errors.password}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium cursor-pointer ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
          <button
            className={`px-4 py-2 font-medium cursor-pointer ${activeTab === "password" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {activeTab === "profile" ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profile.admin_image ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE}/uploads/${profile.admin_image}`}
                      crossOrigin="anonymous"
                      alt={profile.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
                    <Camera size={16} />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                )}
                {errors.avatar && <p className="mt-2 text-sm text-red-600 text-center">{errors.avatar}</p>}
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50 cursor-pointer"
                      >
                        <Save size={16} className="mr-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setSelectedFile(null)
                          setErrors({})
                        }}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={profile.mobile}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                      {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={profile.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={profile.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={profile.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>

            <form onSubmit={handleSavePassword} className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="pt-2 flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer"
                  >
                    <Lock size={16} className="mr-2" />
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPasswordForm({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      })
                      setErrors({})
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile