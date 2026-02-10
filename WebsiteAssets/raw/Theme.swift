import SwiftUI

// MARK: - Design Tokens

enum DDColors {
    // Backgrounds - OLED optimized
    static let backgroundPrimary = Color.black
    static let backgroundSecondary = Color(white: 0.08)
    static let backgroundTertiary = Color(white: 0.12)
    static let backgroundElevated = Color(white: 0.14)

    // Text
    static let textPrimary = Color(white: 0.95)
    static let textSecondary = Color(white: 0.6)
    static let textTertiary = Color(white: 0.4)

    // Accent - Subtle gold/bronze for premium feel
    static let accent = Color(red: 0.85, green: 0.75, blue: 0.55)
    static let accentMuted = Color(red: 0.85, green: 0.75, blue: 0.55).opacity(0.3)

    // Semantic
    static let success = Color.green.opacity(0.8)
    static let destructive = Color.red.opacity(0.8)

    // Pro badge
    static let proBadge = Color(red: 0.9, green: 0.7, blue: 0.3)
    static let proBadgeBackground = Color(red: 0.9, green: 0.7, blue: 0.3).opacity(0.15)
}

enum DDSpacing {
    static let xxs: CGFloat = 4
    static let xs: CGFloat = 8
    static let sm: CGFloat = 12
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
}

enum DDRadius {
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let lg: CGFloat = 16
    static let xl: CGFloat = 24
}

// MARK: - Typography Modifiers

struct DDTypography {
    // Hero quote - the star of the show
    static func heroQuote() -> some ViewModifier {
        HeroQuoteStyle()
    }

    // Section titles
    static func sectionTitle() -> some ViewModifier {
        SectionTitleStyle()
    }

    // Body text
    static func body() -> some ViewModifier {
        BodyStyle()
    }

    // Caption/metadata
    static func caption() -> some ViewModifier {
        CaptionStyle()
    }

    // Small label
    static func label() -> some ViewModifier {
        LabelStyle()
    }
}

private struct HeroQuoteStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 28, weight: .medium, design: .serif))
            .foregroundColor(DDColors.textPrimary)
            .lineSpacing(6)
    }
}

private struct SectionTitleStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 13, weight: .semibold))
            .foregroundColor(DDColors.textSecondary)
            .textCase(.uppercase)
            .tracking(1.2)
    }
}

private struct BodyStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 16, weight: .regular))
            .foregroundColor(DDColors.textPrimary)
    }
}

private struct CaptionStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 13, weight: .regular))
            .foregroundColor(DDColors.textSecondary)
    }
}

private struct LabelStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 11, weight: .medium))
            .foregroundColor(DDColors.textTertiary)
            .textCase(.uppercase)
            .tracking(0.8)
    }
}

// MARK: - View Extensions

extension View {
    func ddHeroQuote() -> some View {
        modifier(HeroQuoteStyle())
    }

    func ddSectionTitle() -> some View {
        modifier(SectionTitleStyle())
    }

    func ddBody() -> some View {
        modifier(BodyStyle())
    }

    func ddCaption() -> some View {
        modifier(CaptionStyle())
    }

    func ddLabel() -> some View {
        modifier(LabelStyle())
    }
}
