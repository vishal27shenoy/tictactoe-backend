const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const res = await mongoose.connect(
			"mongodb+srv://vishalshenoy603:CI4kzAVIb8eikcMl@cluster0.3mbhmlx.mongodb.net/",
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
		console.log("database connected");
	} catch (err) {
		console.log(err);
	}
};
module.exports = connectDB;
