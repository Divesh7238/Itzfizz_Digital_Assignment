function StatCard({ value, description, tone, id }) {
  return (
    <article className={`stat-card stat-card--${tone}`} data-stat={id}>
      <strong>{value}</strong>
      <p>{description}</p>
    </article>
  )
}

export default StatCard
