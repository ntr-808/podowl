export function generatePodLink(consignmentNumber: string): string {
  return `${window.location.origin}?confirm=${consignmentNumber}`;
}

export function generateSmsMessage(driverName: string, items: string, address: string, podLink: string): string {
  return `Hey ${driverName}, click this link to capture a Proof of Delivery for the ${items} going to ${address}. ${podLink}`;
}