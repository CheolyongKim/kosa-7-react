import { Link } from 'react-router-dom'

const MOCK = [
  { id: 1, name: 'Notebook' },
  { id: 2, name: 'Keyboard' },
  { id: 3, name: 'Mouse' },
]

export default function Products() {
  return (
    <>
      <h1>Products</h1>
      <ul style={{ paddingLeft: 20 }}>
        {MOCK.map(p => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}