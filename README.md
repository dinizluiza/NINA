# Nina Front End Tech Challenge
As part of the selection process, we would like you to:
- Build a small Angular application that makes a REST API call to a provided endpoint. This will allow us to evaluate your understanding of Angular, HTTP requests, and working with external APIs.
- Follow the design provided by our designer. This will allow us to measure how well you work with a designer on the team.
- Connect to a web socket and display real time notifications as pop-ups. This will allow us to evaluate your understandings of websockets and data streaming.

Anything more than that such as useful documentation and automated tests will be counted as bonus features and **will** highlight your submission.  

**Not being able to complete all the assignments does not mean failing the challenge! Try to do as much as possible and send us your submission before the deadline even if it's incomplete!**

After the test, even if you aren't selected, the devs at Nina will do their best to give you honest feedback and guide you to future improvements.

When you have completed the test, please submit to us (as a response to the email informing you were selected for the tech challenge):

- A link to the code repository (e.g. GitHub, GitLab, etc.) where we can view your code.

- A brief explanation of your decisions, any challenges you encountered, and how you overcame them (in regard to the challenge).

We look forward to seeing your work!

## Dependencies
|  Package   |  Version  |
| :--------: | :-------: |
|   Node.js   |  >= 16.19.0 |
|    npm | >= 9.5.1
|   Angular   | >= 15.1.2 |

## Challenge

1. Fork this repo and create a new Angular project.

2. Create a new page that will display a dashboard with some data cards, graphs and a table to list items. This dashboard will have filtering capabilities as well.

3. The design and features of the dashboard must follow the visual aid created by our designer. You can take some liberties, but try to follow the given design as much as possible. [The design can be found here](https://www.figma.com/file/rQjLuqf5eYEPjUTEcCHLS5/Processo-Seletivo---NINA?type=design&node-id=0%3A1&mode=design&t=R7Kh7tzTRrUvRdXM-1).

4. The data for the dashboard will be served by a server GET request. This server is given to you, but you need to run it locally. In order to make the server available, run the following commands in your system:

    ```sh
    cd complaints-server
    npm run start
    ```

    The data provider should now be available at: http://localhost:3000/complaints

    This route returns a list of complaints.

    This is the structure of a complaint object:

    ```typescript
    {
      _id: string;
      place: string;
      at_moment: boolean;
      datetime: Date;
      modified_at: Date;
      created_at: Date;
      description: string;
      situation: string[];
      type: string[];
      victim_gender: string;
      victim_age: int;
    }
    ```

    Possible elements in each category:
    ```typescript
    const places = ['bus', 'bus_terminal', 'subway', 'bus_stop', 'subway_terminal'];
    const situations = ['unsolved', 'solved', 'in_progress'];
    const types = ['groping', 'stalking', 'unwanted_photos', 'verbal_aggression', 'physical_aggression'];
    const genders = ['woman_cis', 'man_cis', 'woman_trans', 'man_trans', 'non-binary']
    ```

    To query the data, add the filter condition as a query parameter to the request. For example, to retrieve all the **sorted** by datetime occurrences that happened in **bus_stops**, we can make a GET request using the following URL: http://localhost:3000/complaints?place=bus_stop&_sort=datetime.


5. Make sure your application is responsive and can handle different screen sizes.

6. Handle any errors that may occur during the HTTP request and display a meaningful error message to the user.

7. Implement a filtering feature that allows the user to filter the complaints by different attributes (e.g. complaint type, datetime, etc.). The filtering feature should update the list of complaints in real-time as the user interacts with the filters.

8. Implement an interaction between the graphs and the filtering functionalities (e.g. clicking in the "woman cis" bar will automatically apply the filter for victim_gender = woman_cis and update the list of complaints in real time).

6. You must now connect to a WebSocket that sends real-time notifications and displays them to the user in a visually appealing and user-friendly manner. In order to make the websocket available, run the following commands in your system:
    ```sh
    cd websocket-to-test
    npm run start
    ```

    The socket should now be available to connect at: localhost:8080. You can test it by opening the **test-socket.html** and checking the visual response.

    Your application should connect to the websocket and every user connected to it will receive a notification every 5 minutes. Display the notification to the user of your application.
