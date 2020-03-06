import {TOOL_RESET, TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_PAINT_BUCKET, TOOL_ERASER} from './tool.js';
import Paint from './paint.class.js';

var paint = new Paint("canvas");

paint.activeTool = TOOL_PENCIL;
paint.lineWidth = 1;
paint.brushSize = 6;
paint.selectedColor = '#000000';

paint.init();

// Clicking Reset Button
document.querySelectorAll('[data-command]').forEach(
    item => {
        item.addEventListener('click', e => {
            let selectedTool = item.getAttribute('data-command');
            switch(selectedTool) {
                case TOOL_RESET:
                    paint.reset();
            }
        })
    }
)

// Clicking Tool Buttons
document.querySelectorAll('[data-tool]').forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector('[data-tool].active').classList.toggle('active');
            item.classList.toggle('active');

            let selectedTool = item.getAttribute('data-tool');
            paint.activeTool = selectedTool;

            switch (selectedTool) {
                case TOOL_LINE:
                    paint.lineWidth = 1;
                    document.querySelector(".group.for-shapes").style.display = 'block';
                    // de-activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'none';
                    break;
                case TOOL_RECTANGLE:
                    document.querySelector(".group.for-shapes").style.display = 'block';
                    // de-activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'none';
                    break;
                case TOOL_CIRCLE:
                    document.querySelector(".group.for-shapes").style.display = 'block';
                    // de-activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'none';
                    break;
                case TOOL_TRIANGLE:
                    document.querySelector(".group.for-shapes").style.display = 'block';
                    // de-activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'none';
                    break;
                case TOOL_PENCIL:
                    // activate shape linewidths group
                    document.querySelector(".group.for-shapes").style.display = 'block';
                    // de-activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'none';
                    break;
                case TOOL_ERASER:
                    // activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'block';
                    // de-activate shape linewidths group
                    document.querySelector(".group.for-shapes").style.display = 'none';
                    break;
                case TOOL_BRUSH:
                    // activate brush linewidths group
                    document.querySelector(".group.for-brush").style.display = 'block';
                    // de-activate shape linewidths group
                    document.querySelector(".group.for-shapes").style.display = 'none';
                    break;

                default:
                    document.querySelector(".group.for-shapes").style.display = 'none';
                    document.querySelector(".group.for-brush").style.display = 'none';

            }
        });

        
});

// Clicking LineWidths
document.querySelectorAll('[data-line-width]').forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector('[data-line-width].active').classList.toggle('active');
            item.classList.toggle('active');

            let linewidth  =item.getAttribute('data-line-width');
            paint.lineWidth = linewidth;
        });
});

// Clicking BrushSize
document.querySelectorAll('[data-brush-size]').forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector('[data-brush-size].active').classList.toggle('active');
            item.classList.toggle('active');

            let brushSize = item.getAttribute('data-brush-size');
            paint.brushSize = brushSize;
        });
    });

// Clicking Colors
document.querySelectorAll('[data-color]').forEach(
    item => {
        item.addEventListener('click', e => {
            document.querySelector('[data-color].active').classList.toggle('active');
            item.classList.toggle('active');

            let color = item.getAttribute('data-color');
            paint.selectedColor = color;
        });
});
