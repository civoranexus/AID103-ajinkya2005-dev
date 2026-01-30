import torch
import cv2
import numpy as np

def generate_heatmap(model, image_tensor):
    image_tensor.requires_grad = True

    output = model(image_tensor)
    class_idx = output.argmax()

    model.zero_grad()
    output[0, class_idx].backward()

    gradients = image_tensor.grad[0].cpu().numpy()
    heatmap = np.mean(gradients, axis=0)

    heatmap = np.maximum(heatmap, 0)
    if heatmap.max() != 0:
        heatmap /= heatmap.max()

    heatmap = cv2.resize(heatmap, (224, 224))
    heatmap = np.uint8(255 * heatmap)

    return heatmap
