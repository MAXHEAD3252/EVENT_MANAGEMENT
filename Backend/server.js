require('dotenv').config();
const express = require("express");
const userconnection = require("./database");
const cors = require("cors");
const WebSocket = require('ws');
const bcrypt = require("bcrypt");

console.log('DB_HOST:', process.env.DB_HOST);  // Debugging

const PORT = process.env.PORT || 5000;
const salt = 10;

const app = express();
app.use(cors());
app.use(express.json());

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Function to broadcast message to all connected clients
const broadcast = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});



// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// admin and staff login
app.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM staff WHERE email = ?";

  userconnection.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error("Password comparison error:", bcryptErr);
          return res.status(500).send("Server Error");
        }

        if (isMatch) {
          // Generate a token JWT
          // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
          console.log("Logged in");
          return res.status(200).send({
            success: true,
            message: `${user.name} logged in successfuly`,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } else {
          return res.status(400).json({ error: "Invalid credentials" });
        }
      });
    } else {
      return res.status(400).json({ error: "No email exists" });
    }
  });
});


// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// client login 
app.post('/clientlogin',(req,res) =>{
  const { email, password } = req.body;
  const query = "SELECT * FROM client WHERE email = ?";

  userconnection.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error("Password comparison error:", bcryptErr);
          return res.status(500).send("Server Error");
        }

        if (isMatch) {
          // Generate a token JWT
          // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
          console.log("client Logged in");
          return res.status(200).send({
            success: true,
            message: `${user.name} logged in successfuly`,
            user: {
              id : user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } else {
          return res.status(400).json({ error: "Invalid credentials" });
        }
      });
    } else {
      return res.status(400).json({ error: "No email exists" });
    }
  });
})



// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// CRUD operations Staff
app.get("/staff", (req, res) => {
  const sql = "SELECT * FROM staff";
  userconnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/staff", async(req, res) => {
  const { name, email, password, department} = req.body;
  const role = 0 
  const hashedPassword = await bcrypt.hash(password, salt);
  const sql = "INSERT INTO staff (name,department,email,password,role ) VALUES (?, ?, ?, ?, ?)";

  userconnection.query(sql, [name,department, email,hashedPassword,role ], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const newStaffId = results.insertId;
    console.log("Staff member added to staff with ID:", newStaffId);

    
  });

  
  // const notificationName = 'New Client Added';
  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'New Staff Added'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,name,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const newStaffId = results.insertId;
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);

    // Broadcast the notification
    broadcast({
      type: "staff_added",
      message: `New staff member added by Admin: ${name}`,
      role: 0,
      data: { id: newStaffId, name, department, email }
    });

    res.status(201).send("Staff member added");

  });
  

});

app.put("/staff/:id", (req, res) => {
  const sql = `UPDATE staff SET ? WHERE id = ${req.params.id}`;
  const updatedStaff = req.body;
  userconnection.query(sql, updatedStaff, (err, result) => {
    if (err) throw err;
    res.send("Staff member updated");
  });

  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Staff Updated'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,req.body.name,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const newStaffId = results.insertId;
     const name  =req.body.name
    // Broadcast the notification
    broadcast({
      type: "staff_Updated",
      message: `New staff member added by Admin: ${name}`,
      role: 0,
      data: { id: newStaffId,name }
    });
  });
  
});

app.delete("/staff/:id", (req, res) => {
  const sql = `DELETE FROM staff WHERE id = ${req.params.id}`;
  userconnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Staff member deleted");
  });

  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Staff Member Deleted'
  const notified_by = 'Admin'
  const notification_body = `Id = ${req.params.id}`
  userconnection.query(sql_not, [notification_name,notification_body,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    // const newStaffId = results.insertId;

    // Broadcast the notification
    broadcast({
      type: "staff_added",
      message: `New staff member added by Admin: ${notification_body}`,
      role: 0,
      data: { id: notificationId, notification_body}
    });

  });

});



// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// CRUD operations client
app.get("/client", (req, res) => {
  const sql = "SELECT * FROM client";
  userconnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/client", async(req, res) => {
  const { name, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, salt);
  const sql = "INSERT INTO client (name,email,password ) VALUES (?, ?, ?)";
  

  userconnection.query(sql, [name,email,hashedPassword ], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const newClientId = results.insertId;
    console.log("Client added to client with ID:", newClientId);
  });

  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'New Client Added'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,name,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const newClientId = results.insertId;

    // Broadcast the notification
    broadcast({
      type: "staff_added",
      message: `New staff member added by Admin: ${name}`,
      role: 0,
      data: { id: newClientId, name}
    });

  });

});

app.put("/client/:id", (req, res) => {
  const sql = `UPDATE client SET ? WHERE id = ${req.params.id}`;
  const updatedClient = req.body;
  userconnection.query(sql, updatedClient, (err, result) => {
    if (err) throw err;
    res.send("Staff member updated");
  });
  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Client Udated'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,req.body.name,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const name = req.body.name
    const newClientId = results.insertId;

    // Broadcast the notification
    broadcast({
      type: "Client_Updated",
      message: `New staff member added by Admin: ${name}`,
      role: 0,
      data: { id: newClientId, name}
    });

  });

});

app.delete("/client/:id", (req, res) => {
  const sql = `DELETE FROM client WHERE id = ${req.params.id}`;
  userconnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Staff member deleted");
  });
  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Client Deleted'
  const notified_by = 'Admin'
  const notification_body = `id = ${req.params.id}`
  userconnection.query(sql_not, [notification_name,notification_body,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);

    // Broadcast the notification
    broadcast({
      type: "staff_added",
      message: `New staff member added by Admin: ${notification_body}`,
      role: 0,
      data: { id: newClientId, notification_body}
    });
  });
  
});




// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// CRUD Operations events 

app.get("/event", (req, res) => {
  const sql = "SELECT * FROM events";
  userconnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/event", async (req, res) => {
  const { eventname, staff, client, startdate, enddate,status, rating } = req.body;
  const staffIds = JSON.stringify(staff); // Convert array to JSON string

  const sql = "INSERT INTO events (event_name, staff, client, start_date, end_date, status, rating ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  userconnection.query(sql, [eventname, staffIds, client, startdate, enddate, status, rating], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error adding event");
      return;
    }
    const newEventId = results.insertId;
    console.log("Event added to event with ID:", newEventId);
    res.send({ id: newEventId });
  });

  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'New Event Added'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,eventname,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const newClientId = results.insertId;


    // Broadcast the notification
    broadcast({
      type: "Client_Updated",
      message: `New Event added by Admin: ${eventname}`,
      role: 0,
      userId: staffIds,
      data: { id: newClientId, eventname}
    });

  });

});

app.put("/event/:id", (req, res) => {
  const sql = `UPDATE events SET ? WHERE id = ${req.params.id}`;
  const updatedEvent = req.body;
  userconnection.query(sql, updatedEvent, (err, result) => {
    if (err) throw err;
    res.send("event updated");
  });
  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Event Updated'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,req.body.event_name,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const name = req.body.event_name
    const newClientId = results.insertId;

    // Broadcast the notification
    broadcast({
      type: "Client_Updated",
      message: `Event UPdated by Admin: ${name}`,
      role: 0,
      data: { id: newClientId, name }
    });

  });
});

app.delete("/event/:id", (req, res) => {
  const sql = `DELETE FROM events WHERE id = ${req.params.id}`;
  userconnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Event deleted");
  });

  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Event Deleted'
  const notified_by = 'Admin'
  userconnection.query(sql_not, [notification_name,req.params.id,notified_by], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const name = req.params.id
    const newClientId = results.insertId;

    // Broadcast the notification
    broadcast({
      type: "Client_Updated",
      message: `Event Deleted by Admin: ${name}`,
      role: 0,
      data: { id: newClientId, name }
    });

  });

});





// get assigned events for staff 
app.get('/getassignedevents', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const sql = `
    SELECT events.*, GROUP_CONCAT(staff.name) AS staff_names
    FROM events
    LEFT JOIN staff ON FIND_IN_SET(staff.id, events.staff)
    WHERE FIND_IN_SET(?, events.staff)
    GROUP BY events.id
  `;

  userconnection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send(result);
  });
});



// get assigned clients for staff
app.get('/getassignedclients', (req, res) => {
  const userId = req.query.userId; // Get the user ID from query parameters

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const sql = `
    SELECT DISTINCT
        client.id,
        client.name,
        client.email
    FROM
        client
    JOIN
        events ON client.id = events.client
    WHERE
        FIND_IN_SET(?, events.staff)
  `;

  userconnection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching clients:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send(result);
  });
});




// get staff assigned to client 
app.get('/getassignedstaff', (req, res) => {
  const clientId = req.query.clientId; // Get the client ID from query parameters

  if (!clientId) {
    return res.status(400).send("Client ID is required");
  }

  const sql = `
    SELECT DISTINCT
        staff.id,
        staff.name,
        staff.department,
        staff.email
    FROM
        staff
    JOIN
        events ON FIND_IN_SET(staff.id, events.staff)
    WHERE
        events.client = ?
  `;

  userconnection.query(sql, [clientId], (err, result) => {
    if (err) {
      console.error("Error fetching staff:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send(result);
  });
});


// get events assigned to client
app.post('/getassignedevents', (req, res) => {
  const clientId = req.body.clientId; // Client ID from the request body

  if (!clientId) {
    return res.status(400).json({ error: 'Client ID is required' });
  }

  const sql = `
    SELECT *
    FROM events
    WHERE client = ?
  `;

  userconnection.query(sql, [clientId], (err, result) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(result);
  });
});

// get event history for client
app.post('/geteventhistory', (req, res) => {
  const clientId = req.body.clientId; // Client ID from the request body

  if (!clientId) {
    return res.status(400).json({ error: 'Client ID is required' });
  }

  const sql = `
    SELECT *
    FROM events
    WHERE client = ? AND status = 'Completed'
  `;

  userconnection.query(sql, [clientId], (err, result) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(result);
  });
});

// update the rating by client
app.put('/updateevent/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const updatedEvent = req.body; // Assuming request body contains updated event details
  
  // Example update query
  const sql = `
    UPDATE events
    SET rating = ?
    WHERE id = ?
  `;

  userconnection.query(sql, [updatedEvent.rating, eventId], (err, result) => {
    if (err) {
      console.error("Error updating event:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Event updated successfully' });
  });

  const sql_not = "INSERT INTO notification (notification_name,notification_body,notified_by) VALUES (?, ?, ?)";
  const notification_name = 'Event Rated'
  const notified_by = `Client Name = ${req.body.name}`
  const notification_body = `Event Id = ${req.params.eventId}`
  userconnection.query(sql_not, [notification_name,notification_body,req.body.name], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const notificationId = results.insertId;
    console.log("Notification added to notification center with ID:", notificationId);
    const name = req.params.eventId
    const newClientId = results.insertId;

    // Broadcast the notification
    broadcast({
      type: "Client_Updated",
      message: `${name} Event Rated by Client: ${newClientId}`,
      role: 0,
      data: { id: newClientId, name }
    });

  });

});




// get Notification in noification center 
app.get("/notifications", (req, res) => {
  const sql = "SELECT * FROM notification";
  userconnection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});






// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// listen to port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
