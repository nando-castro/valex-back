export default function unauthorizedError(message: string) {
  return {
    code: "unauthorized",
    status: 401,
    message,
  };
}

export function conflictError(message: string) {
  return {
    code: "conflict",
    status: 409,
    message,
  };
}

export function notFoundError(message: string) {
  return {
    code: "notFound",
    status: 404,
    message,
  };
}
