import { collection, doc, limit, onSnapshot, orderBy, query, setDoc, type Unsubscribe } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { Alert, SensorReading, SystemConfiguration, TimelineEvent } from '../types/slopeShield'

const projectPath = 'projects/slopeShield'

export function observeCurrentStatus(onData: (reading: SensorReading | null) => void, onError: (error: Error) => void): Unsubscribe {
  return onSnapshot(collection(db, `${projectPath}/currentStatus`), (snapshot) => onData((snapshot.docs[0]?.data() as SensorReading) ?? null), onError)
}

export function observeRecentReadings(onData: (readings: SensorReading[]) => void, onError: (error: Error) => void): Unsubscribe {
  const readings = query(collection(db, `${projectPath}/sensorReadings`), orderBy('timestamp', 'desc'), limit(500))
  return onSnapshot(readings, (snapshot) => onData(snapshot.docs.map((doc) => doc.data() as SensorReading).reverse()), onError)
}

export function observeRecentEvents(onData: (events: TimelineEvent[]) => void, onError: (error: Error) => void): Unsubscribe {
  const events = query(collection(db, `${projectPath}/events`), orderBy('timestamp', 'desc'), limit(50))
  return onSnapshot(events, (snapshot) => onData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TimelineEvent)), onError)
}

export function observeRecentAlerts(onData: (alerts: Alert[]) => void, onError: (error: Error) => void): Unsubscribe {
  const alerts = query(collection(db, `${projectPath}/alerts`), orderBy('timestamp', 'desc'), limit(100))
  return onSnapshot(alerts, (snapshot) => onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Alert)), onError)
}

export function observeSystemConfiguration(onData: (configuration: SystemConfiguration | null) => void, onError: (error: Error) => void): Unsubscribe {
  return onSnapshot(doc(db, `${projectPath}/configuration/system`), (snapshot) => onData(snapshot.exists() ? snapshot.data() as SystemConfiguration : null), onError)
}

export function saveSystemConfiguration(configuration: SystemConfiguration) {
  return setDoc(doc(db, `${projectPath}/configuration/system`), configuration, { merge: true })
}
