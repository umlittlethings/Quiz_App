import React from 'react'
import { notifications } from '../utils/Notification'

function Notification({ username }) {
  return (
              <div>
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                <div className="space-y-4">
                  {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-3 px-6 py-4 rounded-lg shadow border mr-3 bg-blue-100 border-blue-300 text-blue-800`}
            >
              <div className="flex-1">
                <span className="font-semibold">
                  {notif.type === "welcome"
                    ? notif.message(username)
                    : notif.message()}
                </span>
                <div className="text-xs mt-1 opacity-70">{notif.time}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Notification