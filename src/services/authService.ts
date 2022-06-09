export async function loginWithUsernameAndPassword(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    await timeout(3_000)
    return true
  } catch (error) {
    return false
  }
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
