import React, { useState } from 'react';
import { BsPersonFill, BsLockFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import './Login.css'; // 使用相同的樣式文件

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 預設的使用者帳號密碼 (實際應用中應該從後端驗證)
  const validUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
    { username: 'manager', password: 'manager123' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除錯誤訊息
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 模擬登入驗證過程
    setTimeout(() => {
      const isValidUser = validUsers.some(
        user => user.username === loginData.username && user.password === loginData.password
      );

      if (isValidUser) {
        // 登入成功，傳遞使用者資訊給父組件
        onLogin({
          username: loginData.username,
          loginTime: new Date().toISOString()
        });
      } else {
        setError('帳號或密碼錯誤，請重新輸入');
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-background-overlay"></div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">⚡</div>
            </div>
            <h1 className="login-title">智能監控系統</h1>
            <p className="login-subtitle">請輸入您的帳號密碼進行登入</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <BsPersonFill className="label-icon" />
                使用者帳號
              </label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                className="form-input"
                placeholder="請輸入使用者帳號"
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <BsLockFill className="label-icon" />
                密碼
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="form-input password-input"
                  placeholder="請輸入密碼"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || !loginData.username || !loginData.password}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  登入中...
                </>
              ) : (
                '登入系統'
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="demo-accounts">
              <h4>測試帳號：</h4>
              <div className="demo-list">
                <span className="demo-item">admin / admin123</span>
                <span className="demo-item">user / user123</span>
                <span className="demo-item">manager / manager123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;