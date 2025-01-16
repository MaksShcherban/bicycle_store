import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      data.value = await response.json()
      console.log(data.value)
    } catch (err) {
      error.value = err
      console.error('Fetch error:', err)
    }
  }

  fetchData()
  return { data, error }
}
