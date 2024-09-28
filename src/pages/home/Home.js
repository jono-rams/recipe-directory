import './Home.css';

export default function Home({data}) {
  return (
    <div className='home'>
      {!data && <p className="loading">Loading...</p>}
      {data && data.map(recipe => (
        <h2 key={recipe.id}>{recipe.title}</h2>
      ))}
    </div>
  )
}
