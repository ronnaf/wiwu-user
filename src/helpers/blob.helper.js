// https://medium.com/@joananespina/uploading-to-firebase-storage-with-react-native-39f4a500dbcb
export const convertUriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      // return the blob
      console.log('[!] convertUriToBlob - got blob!')
      resolve(xhr.response)
    }

    xhr.onerror = function() {
      // something went wrong
      console.log('[!] convertUriToBlob - didnt get the blob...')
      reject(new Error('URI to Blob conversion failed!'))
    }

    // this helps us get a blob
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)

    xhr.send(null)
  })
}
