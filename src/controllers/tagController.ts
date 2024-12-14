import { Request, Response, RequestHandler } from "express";
import { createTag, deleteTag, getAllTags, getIdTag, updateTag } from "../services/tagService";

// Use the RequestHandler type to define the controller functions bc ts sucks
const create: RequestHandler = async (req, res, next) => {
    try {
        const newTag = await createTag(
            req.body.tags
        );
        
        res.status(201).json({
            message: 'Tag created successfully',
            tag: newTag
        });
    } catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ 
            error: "Failed to create tag",
            details: (error as Error).message 
        });
    }
};

const update: RequestHandler = async (req, res, next) => {
    try {
        const updatedTag = await updateTag(
            req.body.tags
        );

        if (!updatedTag) {
            res.status(404).json({ error: "Tag not found" });
            return;
        }

        res.json({
            message: 'Tag updated successfully',
            tag: updatedTag
        });
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({ 
            error: "Failed to update tag",
            details: (error as Error).message 
        });
    }
};

const getAll: RequestHandler = async (req, res, next) => {
    try {
        const tags = await getAllTags();
        res.json({
            message: 'Tags retrieved successfully',
            tags: tags
        });
    } catch (error) {
        console.error('Error getting tags:', error);
        res.status(500).json({ 
            error: "Failed to get tags",
            details: (error as Error).message 
        });
    }
};

const getId: RequestHandler = async (req, res, next) => {
    try {
        const tag = await getIdTag(req.params.id);
        if (!tag) {
            res.status(404).json({ error: "Tag not found" });
            return;
        }
        res.json({
            message: 'Tag retrieved successfully',
            tag: tag
        });
    } catch (error) {
        console.error('Error getting tag:', error);
        res.status(500).json({ 
            error: "Failed to get tag",
            details: (error as Error).message 
        });

    }
};

const remove: RequestHandler = async (req, res, next) => {
    try {
        const deletedTag = await deleteTag(req.params.id);
        if (!deletedTag) {
            res.status(404).json({ error: "Tag not found" });
            return;
        }
        res.json({
            message: 'Tag deleted successfully',
            tag: deletedTag
        });
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ 
            error: "Failed to delete tag",
            details: (error as Error).message 
        });
    }
};
export { create, update, getAll, getId, remove };

