import { useState } from 'react'

export default function App() {
  const [files, setFiles] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  async function handleUpload(e) {
    const uploaded = Array.from(e.target.files)
    const processed = uploaded.map(file => ({
      name: file.name,
      category: file.type.startsWith('image') ? 'image' : 'other',
      blob: file
    }))
    setFiles(processed)
  }

  const results = files.filter(f => {
    if (filter === 'photos' && f.category !== 'image') return false
    if (!query) return true
    return f.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div>
      <h1>Nexearch</h1>

      <input type="file" webkitdirectory multiple onChange={handleUpload} />

      <input
        placeholder="Search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('photos')}>Photos</button>
      </div>

      <ul>
        {results.map((f, i) => (
          <li key={i}>{f.name}</li>
        ))}
      </ul>
    </div>
  )
}
