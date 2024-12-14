import Tag from '../models/tag';

const createTag = async (
    tags: string[]
) => {

    const newTag = new Tag({
        tags
    });

    try {
        const savedTag = await newTag.save();
        console.log('Tag created:', savedTag);
        return savedTag;
    } catch (err) {
        console.error('Error creating tag:', err);
        throw err;

    }
};


const updateTag = async (
    id: string,
    tags?: string[]
) => {
    try {
        // Create update object
        const updateFields: { [key: string]: any } = {};
        if (tags) updateFields.tags = tags;
        // Update tag
        const updatedTag = await Tag.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );
        
        return updatedTag;
    } catch (err) {
        console.error('Error updating tag:', err);
        throw err;
    }
};


const deleteTag = async (id: string) => {
    try {

        const deletedTag = await Tag.findByIdAndDelete(id);
        return deletedTag;
    } catch (err) {
        console.error('Error deleting tag:', err);
        throw err;
    }
};


const getIdTag = async (id: string) => {
    try {
        const tag = await Tag.findById(id);
        return tag;
    } catch (err) {
        console.error('Error finding tag:', err);
        throw err;
    }
};


const getAllTags = async () => {
    try {
        // Return tasks for the specific user and populate category details
        const tags = await Tag.find();
        return tags;
    } catch (err) {
        console.error('Error finding tags:', err);
        throw err;
    }
};

export { createTag, updateTag, deleteTag, getAllTags, getIdTag };