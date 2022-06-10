const Content = require('../models/content')

const getContents = async(req, res) => {
    try
    {
        await Content.find({}, (err, contents) => {
            return res.status(200).render("../public/views/course.ejs", {
              contentList: contents
            })
        })
    }
    catch(err)
    {
        return 
    }
}


const getContent = async(req, res) => {
    try
    {
        await Content.findOne({week: req.params.contentID }, (err, content) => {

            return res.render("../public/views/week.ejs", 
              {content}
            )
        })
    }
    catch(err)
    {
        return 
    }
}

const createContent = async(req, res) => {

    const content = new Content({
        week: req.body.week,
        subject: req.body.subject,
        context: req.body.context
    })

    try
    {
        const c1 = await content.save()
        return res.json(c1)
    }
    catch(err)
    {
        return console.log('Error: ' + err)
    }
}

const updateContent = async(req, res) => {
    try
    {
        const content = await Content.findById(req.params.id)
        if (req.body.week)
            content.week = req.body.week
        if (req.body.subject)
            content.subject = req.body.subject
        if (req.body.context)
            content.context = req.body.context
        const c1 = await content.save()
        return res.json(c1)
    }
    catch(err)
    {
        return res.status(404).send('Course with the given ID is not found.')
    }
}

//NOT USED
const deleteContent = async(req, res) =>{

    try
    {
        const contents = await Content.find()

        contents = contents.filter((content) => content.id !== parseInt(req.params.id))

        return res.json('Content deleted')
    }
    catch(err)
    {
        return res.status(404).send('Course with the given ID is not found.')
    }
}

module.exports = { getContents, createContent, updateContent, getContent, deleteContent}