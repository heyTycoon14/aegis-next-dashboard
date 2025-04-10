"use client";
import { useEffect } from "react";
import useNotificationStore from "../../stores/useNotificationStore";

import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s,
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="pointer-events-none fixed inset-20 z-20 flex items-end">
      <div className="flex w-full flex-col">
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            onHide={() => {
              setNotificationStore((state: any) => {
                // Remove notification at the correct index
                state.notifications = state.notifications.filter(
                  (_: any, i: number) =>
                    i !== reversedNotifications.length - 1 - idx,
                );
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = ({
  type,
  message,
  description,
  onHide,
}: {
  type?: string;
  message: string;
  description?: string;
  onHide?: () => void;
}) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onHide?.();
    }, 8000); // Automatically hide after 8 seconds

    return () => {
      clearTimeout(id);
    };
  }, [onHide]);

  return (
    <div className="pointer-events-auto absolute right-0 top-0 mx-4 mb-12 mt-2 w-full max-w-sm overflow-hidden rounded-md ring-1">
      <div className="rounded-lg bg-black p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === "success" && (
              <CheckCircleIcon className="mr-1 h-8 w-8 text-green-500" />
            )}
            {type === "info" && (
              <InformationCircleIcon className="mr-1 h-8 w-8 text-red-500" />
            )}
            {type === "error" && <XCircleIcon className="mr-1 h-8 w-8" />}
          </div>
          <div className="ml-2 w-0 flex-1">
            <div className="text-fgd-1 font-bold">{message}</div>
            {description && (
              <p className="text-fgd-2 mt-0.5 text-sm">{description}</p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0 self-start">
            <button
              onClick={onHide} // Hide on button click
              className="bg-bkg-2 default-transition text-fgd-3 hover:text-fgd-4 inline-flex rounded-md focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
