import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore.js'

export default function Login() {
  const [name, setName] = useState(''); const [error, setError] = useState(''); const login = useUserStore((state) => state.login); const navigate = useNavigate()
  const submit = (event) => { event.preventDefault(); if (!name.trim()) return setError('이름을 입력해 주세요.'); login({ id: name, name: name.trim(), role: 'USER' }); navigate('/') }
  return <div className="surface p-4 p-md-5 mx-auto" style={{ maxWidth: 500 }}><p className="eyebrow">Welcome back</p><h1 className="page-title mt-2 mb-2">로그인</h1><p className="muted mb-4">학습용 데모 로그인입니다. 이름만 입력하면 시작할 수 있어요.</p><form onSubmit={submit}><label className="form-label fw-bold">이름</label><input autoFocus className="form-control mb-2" value={name} onChange={(event) => { setName(event.target.value); setError('') }} placeholder="예: 홍길동" />{error && <p className="text-danger small mb-3">{error}</p>}<button className="btn btn-primary w-100 mt-2">계속하기</button></form></div>
}
