import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_PAINT_BUCKET, TOOL_ERASER } from './tool.js';

import { getMouseCoordsOnCanvas, findDistance } from './utility.js';

export default class Paint {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
    }

    // Setting Tool
    set activeTool(tool) {
        this.tool = tool;
    }

    // Setting Pencil LineWidths
    set lineWidth(linewidth) {
        this.line_width = linewidth;
        this.context.lineWidth = this.line_width;
    }

    // Setting BrushSize
    set brushSize(brushsize) {
        this.brush_size = brushsize;
    }

    // Setting Color
    set selectedColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    // Initializing
    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {
        this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

        if(this.tool == TOOL_PENCIL || this.tool == TOOL_BRUSH) {
            this.context.beginPath();
            this.context.moveTo(this.startPos.x, this.startPos.y);
        }

    }

    onMouseMove(e) {
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
        
        switch(this.tool) {
            case TOOL_LINE:
                this.drawShape();
                break;
            case TOOL_RECTANGLE:
                this.drawShape();
                break;
            case TOOL_CIRCLE:
                this.drawShape();
                break;
            case TOOL_TRIANGLE:
                this.drawShape();
                break;
            case TOOL_PENCIL:
                this.drawFreeLine(this.line_width);
                break;
            case TOOL_BRUSH:
                this.drawFreeLine(this.brush_size);
                break;
            default:
                break;
        }


    }

    onMouseUp(e) {
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawShape() {
        this.context.putImageData(this.savedData, 0, 0);

        this.context.beginPath();

        if(this.tool == TOOL_LINE) {
            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
        }

        else if (this.tool == TOOL_RECTANGLE) {
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y-this.startPos.y);
        } 
        
        else if (this.tool == TOOL_CIRCLE) {
            let radius = findDistance(this.startPos, this.currentPos)

            this.context.arc(this.startPos.x, this.startPos.y, radius, 0, 2*Math.PI, false);
        }

        else if (this.tool == TOOL_TRIANGLE) {
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x)/2, this.startPos.y);
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);

            this.context.closePath();
        }
        this.context.stroke();
    }

    drawFreeLine(linewidth) {
        this.context.lineWidth = linewidth;
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }

    reset() {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}