#!/usr/bin/env swift

import Foundation
import CoreGraphics
import CoreText
import ImageIO
import UniformTypeIdentifiers

// OG Image configuration
let width: CGFloat = 1200
let height: CGFloat = 630
let backgroundColor = CGColor(red: 0.05, green: 0.05, blue: 0.08, alpha: 1.0) // #0D0D14

let textColor = CGColor(red: 0.95, green: 0.90, blue: 0.80, alpha: 1.0) // #F2E6CC (cream)
let subtitleColor = CGColor(red: 0.85, green: 0.75, blue: 0.55, alpha: 1.0) // #D9BF8C (accent)

// Create bitmap context
let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
    data: nil,
    width: Int(width),
    height: Int(height),
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
context.fill(CGRect(x: 0, y: 0, width: width, height: height))

// Add subtle radial gradient for depth (matching app icon style)
let gradientColors = [
    CGColor(red: 0.15, green: 0.12, blue: 0.18, alpha: 0.2),
    CGColor(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.0)
] as CFArray
let gradientLocations: [CGFloat] = [0.0, 1.0]
if let gradient = CGGradient(colorsSpace: colorSpace, colors: gradientColors, locations: gradientLocations) {
    context.drawRadialGradient(
        gradient,
        startCenter: CGPoint(x: width / 2, y: height / 2),
        startRadius: 0,
        endCenter: CGPoint(x: width / 2, y: height / 2),
        endRadius: width * 0.6,
        options: []
    )
}

// Draw "DD" mark (smaller, left of center)
let markText = "DD"
let markFontSize: CGFloat = 180
let markFont = CTFontCreateWithName("Georgia-Bold" as CFString, markFontSize, nil)

let markAttributes: [CFString: Any] = [
    kCTFontAttributeName: markFont,
    kCTForegroundColorAttributeName: textColor
]
let markAttrString = CFAttributedStringCreate(
    kCFAllocatorDefault,
    markText as CFString,
    markAttributes as CFDictionary
)!
let markLine = CTLineCreateWithAttributedString(markAttrString)
let markBounds = CTLineGetBoundsWithOptions(markLine, .useGlyphPathBounds)

// Draw "Daily Doctrine" wordmark
let wordmarkText = "Daily Doctrine"
let wordmarkFontSize: CGFloat = 64
let wordmarkFont = CTFontCreateWithName("Georgia-Bold" as CFString, wordmarkFontSize, nil)

let wordmarkAttributes: [CFString: Any] = [
    kCTFontAttributeName: wordmarkFont,
    kCTForegroundColorAttributeName: textColor
]
let wordmarkAttrString = CFAttributedStringCreate(
    kCFAllocatorDefault,
    wordmarkText as CFString,
    wordmarkAttributes as CFDictionary
)!
let wordmarkLine = CTLineCreateWithAttributedString(wordmarkAttrString)
let wordmarkBounds = CTLineGetBoundsWithOptions(wordmarkLine, .useGlyphPathBounds)

// Layout: DD mark and wordmark stacked vertically, centered
let gap: CGFloat = 24
let totalHeight = markBounds.height + gap + wordmarkBounds.height
let startY = (height - totalHeight) / 2

// Draw DD mark (centered horizontally)
context.saveGState()
let markX = (width - markBounds.width) / 2 - markBounds.origin.x
let markY = startY + wordmarkBounds.height + gap - markBounds.origin.y
context.textPosition = CGPoint(x: markX, y: markY)
CTLineDraw(markLine, context)
context.restoreGState()

// Draw wordmark (centered horizontally, below mark)
context.saveGState()
let wordmarkX = (width - wordmarkBounds.width) / 2 - wordmarkBounds.origin.x
let wordmarkY = startY - wordmarkBounds.origin.y
context.textPosition = CGPoint(x: wordmarkX, y: wordmarkY)
CTLineDraw(wordmarkLine, context)
context.restoreGState()

// Add subtle vignette around edges
context.saveGState()
let edgeGradient = CGGradient(
    colorsSpace: colorSpace,
    colors: [
        CGColor(red: 0, green: 0, blue: 0, alpha: 0.3),
        CGColor(red: 0, green: 0, blue: 0, alpha: 0.0)
    ] as CFArray,
    locations: [0.0, 1.0]
)!

for i in 0..<4 {
    context.saveGState()
    context.translateBy(x: width / 2, y: height / 2)
    context.rotate(by: CGFloat(i) * .pi / 2)
    context.translateBy(x: -width / 2, y: -height / 2)
    context.drawLinearGradient(
        edgeGradient,
        start: CGPoint(x: width / 2, y: 0),
        end: CGPoint(x: width / 2, y: height * 0.12),
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

// Determine output path
let scriptDir = URL(fileURLWithPath: #filePath).deletingLastPathComponent()
let outputURL = scriptDir
    .deletingLastPathComponent()
    .appendingPathComponent("WebsiteAssets/og/og-1200x630.png")

guard let destination = CGImageDestinationCreateWithURL(
    outputURL as CFURL,
    UTType.png.identifier as CFString,
    1,
    nil
) else {
    print("Failed to create image destination at: \(outputURL.path)")
    exit(1)
}

CGImageDestinationAddImage(destination, cgImage, nil)

if CGImageDestinationFinalize(destination) {
    print("OG image saved to: \(outputURL.path)")
    print("Size: \(Int(width))x\(Int(height)) pixels")
} else {
    print("Failed to save OG image")
    exit(1)
}
