export const json = async (response: Response) => {
  try {
    return await response.json()
  } catch (e) {
    // if response is null and not error
    if (response.ok) return null

    return {
      code: 'something_wrong',
      message: 'Something Wrong',
    }
  }
}
