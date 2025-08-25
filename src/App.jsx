import { useEffect, useState } from 'react'

export default function App() {
  const [user, setUser] = useState(null)
  const [inTelegram, setInTelegram] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      setInTelegram(true)
      try {
        tg.ready()
        tg.expand()
      } catch (_) {}
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }
    } else {
      // Не в Telegram — оставим предупреждение
      setInTelegram(false)
    }
  }, [])

  const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">🚀 Telegram Mini App</h1>
        <p className="text-sm text-gray-600 mb-6">
          Базовый шаблон на React + Tailwind для мини‑приложения.
        </p>

        {inTelegram ? (
          <div className="space-y-3">
            <p className="text-lg">
              {user ? (
                <>
                  Привет, <span className="font-semibold">{user.first_name}</span>!
                </>
              ) : (
                'Добро пожаловать!'
              )}
            </p>
            <button
              className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow hover:opacity-90 transition"
              onClick={() => tg?.close()}
            >
              Закрыть WebApp
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-base">
              Вы запустили приложение <span className="font-semibold">в браузере</span>.
            </p>
            <p className="text-sm text-gray-600">
              Основные функции веб‑аппа работают только внутри клиента Telegram.
              Откройте эту страницу через кнопку <span className="font-semibold">«Открыть»</span> у вашего бота.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
