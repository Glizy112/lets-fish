**<u>*Current Phase - To Do*</u>**
****
## Phase 2: Test the APIs with Postman
#### 1. Test the `Create Campaign` API

Request Type:
`POST` http://localhost:5000/api/campaigns

Body `JSON`:
```JSON
{
  "name": "Awareness Campaign 1",
  "template": "Urgent password reset email"
}
```
Expected Output `JSON`:
```JSON
{
  "message": "Campaign created successfully",
  "campaignId": 1
}
```
****
#### 2. Test the `Get Campaign` API

Request Type:
`GET` http://localhost:5000/api/campaigns/1

Expected Output `JSON`:
```JSON
{
  "id": 1,
  "name": "Awareness Campaign 1",
  "template": "Urgent password reset email",
  "created_at": "..."
}
```
****
#### 1. Test the `Log Event` API

Request Type:
`POST` http://localhost:5000/api/events

Body `JSON`:
```JSON
{
  "user_id": 1,
  "campaign_id": 1,
  "event_type": "click"
}
```
Expected Output `JSON`:
```JSON
{
  "message": "Event logged successfully",
  "eventId": 1
}
```
<u>*End of Phase 2 with Postman Testing*</u>