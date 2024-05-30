import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "./ui/button"

export interface PaginationProps {
    pageIndex: number,
    totalCount: number,
    perPager: number,
    onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({pageIndex, totalCount, perPager, onPageChange}: PaginationProps){
    const pages = Math.ceil(totalCount / perPager) || 1
    

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                Total de {totalCount} registros
            </span>

            <div className="flex items-center gap-6 lg:gap-8">
                <div className="text-sm font-medium">Página {pageIndex} de {pages}</div>
                <div className="flex items-center gap-2">
                    <Button
                     variant="outline"
                     className="h-8 w-8 p-8"
                     onClick={() => onPageChange(0)}
                     disabled={pageIndex <= 1}
                      >
                        <ChevronsLeft className="absolute h-4 w-4"/>
                        <span className="sr-only">Primeira página</span>
                    </Button>
                    <Button
                    disabled={pageIndex <= 1}
                    onClick={() => onPageChange(pageIndex - 1)} 
                    variant="outline" 
                    className="h-8 w-8 p-8">
                        <ChevronLeft className="absolute h-4 w-4"/>
                        <span className="sr-only">Página anterior</span>
                    </Button>
                    <Button
                    disabled={pageIndex === 0 || pages <= pageIndex}
                    onClick={() => onPageChange(pageIndex + 1)}
                     variant="outline" 
                     className="h-8 w-8 p-8">
                        <ChevronRight className="absolute h-4 w-4"/>
                        <span className="sr-only">Próxima página</span>
                    </Button>
                    <Button
                    onClick={() => onPageChange(pages - 1)}
                    disabled={pages <= pageIndex} 
                    variant="outline" 
                    className="h-8 w-8 p-8">
                        <ChevronsRight className="absolute h-4 w-4"/>
                        <span className="sr-only">Última página</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}