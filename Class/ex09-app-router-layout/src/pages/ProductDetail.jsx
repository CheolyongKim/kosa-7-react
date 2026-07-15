import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <>
      <h1>Product Detail</h1>
      <p>현재 상품 ID: {id}</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: 12 }}>
        ← 뒤로가기
      </button>
    </>
  )
}