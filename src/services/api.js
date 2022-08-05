export default async function getApi() {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await api.json();
  localStorage.token = result.token;
}
