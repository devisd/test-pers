export const file = async (response: Response) => {
  const buffer = new Buffer(await (await response.blob()).arrayBuffer())
  return 'data:' + response.headers.get('Content-Type') + ';base64,' + buffer.toString('base64')
}

export const decode = (base64: string) => {
  // Split into two parts
  const parts = base64.split(';base64,')

  // Hold the content type
  const imageType = parts[0].split(':')[1]

  // Decode Base64 string
  const decodedData = window.atob(parts[1])

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length)

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType })
}
