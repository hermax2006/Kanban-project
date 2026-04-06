import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

let echoInstance = null

export function getEcho() {
  if (!echoInstance) {
    console.log('Echo config:', {
      key: import.meta.env.VITE_REVERB_APP_KEY,
      host: import.meta.env.VITE_REVERB_HOST,
      port: import.meta.env.VITE_REVERB_PORT,
    })
    echoInstance = new Echo({
      broadcaster: 'reverb',
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: 443,
      wssPort: 443,
      forceTLS: true,
      enabledTransports: ['wss'],
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            const token = localStorage.getItem('token')
            fetch('https://kanban-project-production-12b7.up.railway.app/broadcasting/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name,
              }),
            })
            .then(res => res.json())
            .then(data => callback(null, data))
            .catch(err => callback(err))
          }
        }
      },
    })
  }
  return echoInstance
}


export function resetEcho() {
  if (echoInstance) {
    echoInstance.disconnect()
    echoInstance = null
  }
}