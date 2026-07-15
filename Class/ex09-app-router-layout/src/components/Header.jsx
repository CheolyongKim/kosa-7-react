import { NavLink } from 'react-router-dom'

const linkStyle = ({ isActive }) => ({
  padding: '8px 12px',
  borderRadius: 8,
  textDecoration: 'none',
  color: isActive ? '#fff' : '#333',
  background: isActive ? '#2563eb' : 'transparent',
})

export default function Header() {
  return (
    <header style={{
      borderBottom: '1px solid #eee',
      padding: '16px 0',
      marginBottom: 8,
      background: '#fafafa'
    }}>
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontWeight: 700, marginRight: 16 }}>My App</div>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/products" style={linkStyle}>Products</NavLink>
      </nav>
    </header>
  )
}