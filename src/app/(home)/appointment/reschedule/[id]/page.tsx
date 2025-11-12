// src/app/appointment/reschedule/page.tsx
import { Suspense } from 'react';
import RescheduleAppointment from '../RescheduleAppointment';

export default function ReschedulePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RescheduleAppointment />
    </Suspense>
  );
}