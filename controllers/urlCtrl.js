const Url = require("../models/urlModel");
const shortid = require("shortid");

const authCtrl = {
  createUrl: async (req, res) => {
    try {
      const { originalUrl, userId } = req.body;
      // const domain = sliceUrlUntilDomain(originalUrl);
      // Generate a short URL
      const shortId = shortid.generate();

      // Create a new URL record in the database
      const url = new Url({
        originalUrl,
        shortId,
        user: userId,
      });

      await url.save();

      res.json({
        msg: "Short Url Created",
        shortId: url._doc.shortId,
        userId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getAllUrls: async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(404).send({ error: "Un Authorised" });

      const urls = await Url.find({
        user: userId,
      }).select("-user");

      if (urls.length === 0) {
        return res.status(404).json({ error: "No URLs found for the user" });
      }

      res.json({
        urls,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  fetchUrl: async (req, res) => {
    try {
      const { shortId } = req.params;

      if (!shortId)
        return res.status(404).send({ error: "Short Id required!" });
      // https://www.shorturl.com

      // https://www.facebook.com?user=agarjun => 134526

      // https://www.shorturl.com/134526 =>

      // domain.com /:shortId

      // Find the URL in the database based on the short URL
      const url = await Url.findOne({ shortId });

      if (!url) {
        return res.status(404).json({ message: "URL not found" });
      }

      // Increase the click count
      url.clicks++;

      await url.save();

      // Respond with the original URL
      res.status(200).json({ originalUrl: url.originalUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getUrl: async (req, res) => {
    try {
      const { shortId } = req.params;

      if (!shortId)
        return res.status(404).send({ error: "Short Id required!" });
      const url = await Url.findOne({ shortId });

      if (!url) {
        return res.status(404).json({ message: "URL not found" });
      }

      res.status(200).json({ url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateUrl: async (req, res) => {
    try {
      const { originalUrl } = req.body;

      const url = await Url.findOneAndUpdate(
        { shortId: req.params.shortId },
        {
          originalUrl,
        }
      );

      res.json({
        msg: "Url Updated!",
        newUrl: {
          ...url._doc,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUrl: async (req, res) => {
    try {
      const url = await Url.findOneAndDelete({ shortId: req.params.shortId });

      if (!url) {
        return res.status(404).json({ msg: "URL not found" });
      }

      res.json({
        msg: "URL Deleted!",
        deletedUrl: url,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authCtrl;
