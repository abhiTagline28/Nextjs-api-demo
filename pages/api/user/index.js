import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-atlas-demo");
  // const userList = [
  //   { name: "Abhi", age: "24", email: "abhi@gmail.com" },
  //   { name: "Milan", age: "28", email: "milan@gmail.com" },
  // ];
  if (req.method === "GET") {
    const userList = await db.collection("post").find({}).toArray();

    res.json({ status: 200, data: userList });

    // console.log("userList", userList);
    // res.status(200).json(userList);
  } else if (req.method === "POST") {
    const user = req.body;
    console.log("user", JSON.parse(user));
    // userList.push(JSON.parse(user));
    // console.log("userList", userList);
    // res.status(201).json({ status: 201, data: userList });

    let addedUser = await db.collection("post").insertOne(JSON.parse(user));
    console.log("addedUser", addedUser);
    res
      .status(201)
      .json({ status: 201, msg: "User added successfully", data: addedUser });
  }
}
