// components/Breadcrumbs.tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Breadcrumbs as NextUiBreadcrumbs, BreadcrumbItem } from "@nextui-org/react"

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter((segment) => segment)

  const breadcrumbs = [
    { key: "home", label: "Home", href: "/" },
    ...pathSegments.map((segment, index) => ({
      key: segment,
      label: capitalize(segment),
      href: "/" + pathSegments.slice(0, index + 1).join("/"),
    })),
  ]

  return (
    <>
      <NextUiBreadcrumbs>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <BreadcrumbItem key={breadcrumb.key} isCurrent={isLast} className="text-xs text-gray-500">
              {isLast ? (
                breadcrumb.label
              ) : (
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              )}
            </BreadcrumbItem>
          )
        })}
      </NextUiBreadcrumbs>
    </>
  )
}

export default Breadcrumbs
