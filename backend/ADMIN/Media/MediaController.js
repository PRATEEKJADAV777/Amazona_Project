const Randomstring = require("randomstring");
const mediamodel = require("./MediaModel");
class MediaController {
    async GetMedia(req, res) {
        try {
            const fs = require("fs")
            let File = req.files.file;
            let { mimetype, size } = File
            let name = File.name;
            let ext = name.split('.');
            ext = ext[ext.length - 1];

            name = Randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            }).toLowerCase();
            name = name + '.' + ext;

            File.name = name;

            mimetype = mimetype.split("/")[0]

            if (mimetype !== 'image' && mimetype !== 'video') {
                mimetype = 'application'
            }

            const folderName = `./uploads/${mimetype}`;

            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
            } catch (err) {
                console.error(err);
            }

            let path = `./uploads/${mimetype}/${name}`;
            const result = await File.mv(path);
            path = path.substring(1, path.length)
            let Media = await mediamodel.create({ name, mimetype, ext, path, size });
            let url = `https://localhost:5100${path}`
            Media = Media._doc
            Media.url = url
            res.json({ success: true, media: { ...Media } });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }

    async ShowMedia(req, res) {
        try {
            // const result = await mediamodel.aggregate([
            //     {
            //         $match: {
            //             $or: [
            //                 { mimetype: "image" },
            //                 { mimetype: "video" }
            //             ]
            //         }
            //     },
            //     // {
            //     //     $addFields: {
            //     //         url: {
            //     //             $concat: [ "https://localhost:5100", "$path" ]
            //     //         }
            //     //     }
            //     // },
            //     {
            //         $addFields: {
            //             RelevantImages: {
            //                 _id: "$_id",
            //                 mimetype: "$mimetype",
            //                 ext: "$ext",
            //                 url: {
            //                     $concat: ["https://localhost:5100", "$path"]
            //                 }

            //             }
            //         }
            //     },
            //     {
            //         $sort: { createdAt: -1 }
            //     }
            // ]);

            const result = await mediamodel.find({
                $or: [
                    { mimetype: "image" },
                    { mimetype: "video" }
                ]
            },
                {
                    "_id": 1, "mimetype": 1, "url": {
                        $concat: [
                            "https://localhost:5100",
                            "$path"
                        ]
                    }
                },
            ).sort({ createdAt: -1 })

            if (result) return res.status(200).send({ message: "Success", media: result })
            return res.status(400).send({ message: "Somthing Went Wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Sevrer Error" })
        }

    }
}

const mediaController = new MediaController();
module.exports = mediaController;


