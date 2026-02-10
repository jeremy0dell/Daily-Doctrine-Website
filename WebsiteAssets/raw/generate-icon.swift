#!/usr/bin/env swift

import Foundation
import CoreGraphics
import CoreText
import ImageIO
import UniformTypeIdentifiers

// Icon configuration
let size: CGFloat = 1024
let backgroundColor = CGColor(red: 0.05, green: 0.05, blue: 0.08, alpha: 1.0) // Dark navy/black
let textColor = CGColor(red: 0.95, green: 0.90, blue: 0.80, alpha: 1.0) // Warm cream/gold

// Create bitmap context
let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
    data: nil,
    width: Int(size),
    height: Int(size),
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
    print("Failed to create context")
    exit(1)
}

// Fill background
context.setFillColor(backgroundColor)
context.fill(CGRect(x: 0, y: 0, width: size, height: size))

// Add subtle gradient overlay for depth
let gradientColors = [
    CGColor(red: 0.15, green: 0.12, blue: 0.18, alpha: 0.3),
    CGColor(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.0)
] as CFArray
let gradientLocations: [CGFloat] = [0.0, 1.0]
if let gradient = CGGradient(colorsSpace: colorSpace, colors: gradientColors, locations: gradientLocations) {
    context.drawRadialGradient(
        gradient,
        startCenter: CGPoint(x: size/2, y: size/2),
        startRadius: 0,
        endCenter: CGPoint(x: size/2, y: size/2),
        endRadius: size * 0.7,
        options: []
    )
}

// Draw "DD" text
let text = "DD"
let fontSize: CGFloat = size * 0.45

// Use a serif font for classic feel
let font = CTFontCreateWithName("Georgia-Bold" as CFString, fontSize, nil)

// Create attributed string using CoreText attributes
let attributes: [CFString: Any] = [
    kCTFontAttributeName: font,
    kCTForegroundColorAttributeName: textColor
]
let attributedString = CFAttributedStringCreate(
    kCFAllocatorDefault,
    text as CFString,
    attributes as CFDictionary
)!
let line = CTLineCreateWithAttributedString(attributedString)

// Get text bounds for centering
let bounds = CTLineGetBoundsWithOptions(line, .useGlyphPathBounds)
let textX = (size - bounds.width) / 2 - bounds.origin.x
let textY = (size - bounds.height) / 2 - bounds.origin.y

// Draw text
context.saveGState()
context.textPosition = CGPoint(x: textX, y: textY)
CTLineDraw(line, context)
context.restoreGState()

// Add subtle inner shadow/glow effect around edges (vignette)
context.saveGState()
let edgeGradient = CGGradient(
    colorsSpace: colorSpace,
    colors: [
        CGColor(red: 0, green: 0, blue: 0, alpha: 0.4),
        CGColor(red: 0, green: 0, blue: 0, alpha: 0.0)
    ] as CFArray,
    locations: [0.0, 1.0]
)!

// Draw vignette from each edge
for i in 0..<4 {
    context.saveGState()
    context.translateBy(x: size/2, y: size/2)
    context.rotate(by: CGFloat(i) * .pi / 2)
    context.translateBy(x: -size/2, y: -size/2)
    context.drawLinearGradient(
        edgeGradient,
        start: CGPoint(x: size/2, y: 0),
        end: CGPoint(x: size/2, y: size * 0.15),
        options: []
    )
    context.restoreGState()
}
context.restoreGState()

// Generate image
guard let cgImage = context.makeImage() else {
    print("Failed to create image")
    exit(1)
}

// Save to file
let outputPath = "Assets.xcassets/AppIcon.appiconset/AppIcon.png"
let outputURL = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
    .appendingPathComponent(outputPath)

guard let destination = CGImageDestinationCreateWithURL(
    outputURL as CFURL,
    UTType.png.identifier as CFString,
    1,
    nil
) else {
    print("Failed to create image destination")
    exit(1)
}

CGImageDestinationAddImage(destination, cgImage, nil)

if CGImageDestinationFinalize(destination) {
    print("✅ Icon saved to: \(outputPath)")
    print("   Size: \(Int(size))x\(Int(size)) pixels")
} else {
    print("❌ Failed to save icon")
    exit(1)
}
