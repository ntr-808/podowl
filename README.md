# Podowl

## Data Flow

- Sender / Origin
    - Whoever @ Westside Bakery
    - Sale is start
        - Want to deliver Bread to Hector's Deli
        - Pick & Pack Order
        - Consign
            - Generates
                - Manifest
                - Consignment Numbers []

- Carrier / Coordinator / Organiser
    - Carl @ Kubic
    - Gets notified of manifest
    - Allocates job to:
        - Prime Contractor (Kubic drivers within TMS)

        OR !!!!!!
        - Subcontractor outside tms
        Where we step in...


- PODOWL
    - Job Generated
        - API
        - UI

    - onWaiting
        - SMS Courier
            - package is waiting at job.origin
        - SMS Origin
            - about package to pickup (nice to have)
        - SMS Organiser
            - package has been assigned to Courier.name
        - SMS Receiver
            - package has been assigned to Courier.name (nice to have)

    - onPickup
        - Courier signs manifest generated by Kubic TMS
            - goes to link in waitingSms
                - confirms items
                - submits pickup
                    - status updated to inTransit

- Receiver / Destination
