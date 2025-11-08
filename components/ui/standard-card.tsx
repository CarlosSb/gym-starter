"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card"
import { Badge } from "./badge"
import { Skeleton } from "./skeleton"

const cardVariants = cva(
  "group relative transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border hover:border-red-accent/50",
        promotion: "border-2 hover:border-red-accent bg-gradient-to-br from-white to-red-50/30",
        partner: "border-border hover:border-blue-500/50 bg-gradient-to-br from-white to-blue-50/30",
        ad: "border-border hover:border-green-500/50 bg-gradient-to-br from-white to-green-50/30",
        testimonial: "border-border hover:border-purple-500/50 bg-gradient-to-br from-white to-purple-50/30",
        featured: "border-2 border-red-accent shadow-lg bg-gradient-to-br from-red-50/50 to-white"
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

interface StandardCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  loading?: boolean
  featured?: boolean
  interactive?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function StandardCard({
  variant = "default",
  size = "md",
  loading = false,
  featured = false,
  interactive = false,
  onClick,
  className,
  children,
  ...props
}: StandardCardProps) {
  if (loading) {
    return <CardSkeleton size={size || "md"} />
  }

  const finalVariant = featured ? "featured" : variant

  return (
    <Card
      className={cn(
        cardVariants({ variant: finalVariant, size }),
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {featured && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-accent text-white shadow-lg z-10">
          Destaque
        </Badge>
      )}
      {children}
    </Card>
  )
}

interface CardSkeletonProps {
  size?: "sm" | "md" | "lg" | "xl"
}

function CardSkeleton({ size = "md" }: CardSkeletonProps) {
  const heightClasses = {
    sm: "h-32",
    md: "h-40",
    lg: "h-48",
    xl: "h-56"
  }

  return (
    <Card className={cn("animate-pulse", cardVariants({ size }))}>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className={cn("w-full", heightClasses[size])} />
        </div>
      </CardContent>
    </Card>
  )
}

export { cardVariants }