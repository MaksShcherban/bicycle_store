export async function useFetch(url) {
  let data, error
  try {
    const response = await fetch(url)
    data = await response.json()
  } catch (err) {
    error = err
    // console.error('Fetch error:', err)
  }

  return { data, error }
}
