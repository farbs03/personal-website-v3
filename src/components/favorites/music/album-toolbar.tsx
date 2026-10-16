import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortKeys, sortLabels, type AlbumFilters, type SortDir, type SortKey } from "@/lib/favorites/music/album-query";
import { cn } from "cn";
import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Disc3, ListFilter, Search, X } from "lucide-react";

export type AlbumQuery = AlbumFilters & { sort: SortKey, dir: SortDir }

type Props = {
    query: AlbumQuery,
    onChange: (patch: Partial<AlbumQuery>) => void,
    onClear: () => void,
    artists: string[],
    genres: string[],
    shown: number,
    total: number,
}

const buttonClass = "flex items-center gap-2 h-10 px-3 rounded-xl border border-slate-200 text-sm hover:bg-slate-100 transition duration-200 ease-in outline-none focus-visible:ring-2 focus-visible:ring-sunset/50 data-popup-open:bg-slate-100"

// Adds or removes a value from a multi-select list
const toggle = (list: string[] | undefined, value: string, on: boolean) =>
    on ? [...(list ?? []), value] : (list ?? []).filter((v) => v !== value)

export default function AlbumToolbar({ query, onChange, onClear, artists, genres, shown, total }: Props) {
    const { q = "", sort, dir, artists: selectedArtists = [], genres: selectedGenres = [], vinyl = false } = query
    const filterCount = selectedArtists.length + selectedGenres.length + (vinyl ? 1 : 0)
    const hasActive = filterCount > 0 || q !== ""
    const DirIcon = dir === "asc" ? ArrowUp : ArrowDown

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
                <SearchInput value={q} onChange={(value) => onChange({ q: value })} />

                <div className="flex gap-2">
                    {/* Sort */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className={buttonClass}>
                            <ArrowUpDown className="size-4" />
                            {sortLabels[sort]}
                            <DirIcon className="size-4 text-slate-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuRadioGroup value={sort} onValueChange={(value: SortKey) => onChange({ sort: value })}>
                                    {sortKeys.map((key) => (
                                        <DropdownMenuRadioItem key={key} value={key}>{sortLabels[key]}</DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Order</DropdownMenuLabel>
                                <DropdownMenuRadioGroup value={dir} onValueChange={(value: SortDir) => onChange({ dir: value })}>
                                    <DropdownMenuRadioItem value="desc"><ArrowDown /> Descending</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="asc"><ArrowUp /> Ascending</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonClass, filterCount > 0 && "border-sunset/60")}>
                            <ListFilter className="size-4" />
                            Filter
                            {filterCount > 0 && (
                                <span className="min-w-5 h-5 px-1.5 rounded-full bg-sunset text-white text-xs font-semibold flex items-center justify-center">
                                    {filterCount}
                                </span>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuCheckboxItem checked={vinyl} onCheckedChange={(checked) => onChange({ vinyl: checked })}>
                                <Disc3 /> On vinyl
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <FilterSubmenu
                                label="Artist"
                                options={artists}
                                selected={selectedArtists}
                                onToggle={(value, on) => onChange({ artists: toggle(selectedArtists, value, on) })}
                            />
                            <FilterSubmenu
                                label="Genre"
                                options={genres}
                                selected={selectedGenres}
                                onToggle={(value, on) => onChange({ genres: toggle(selectedGenres, value, on) })}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Active filters + result count */}
            {hasActive && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-slate-500 mr-1">{shown} of {total} albums</span>
                    {vinyl && <Chip label="On vinyl" onRemove={() => onChange({ vinyl: false })} />}
                    {selectedArtists.map((artist) => (
                        <Chip key={`artist-${artist}`} label={artist} onRemove={() => onChange({ artists: toggle(selectedArtists, artist, false) })} />
                    ))}
                    {selectedGenres.map((genre) => (
                        <Chip key={`genre-${genre}`} label={genre} onRemove={() => onChange({ genres: toggle(selectedGenres, genre, false) })} />
                    ))}
                    <button type="button" onClick={onClear} className="text-slate-500 hover:text-sunset underline-offset-2 hover:underline">
                        Clear all
                    </button>
                </div>
            )}
        </div>
    )
}

// Holds its own text so typing stays snappy; the URL catches up a moment later.
// Re-syncs whenever the URL value changes from elsewhere (Clear all, browser back).
function SearchInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const [text, setText] = useState(value)
    const [prevValue, setPrevValue] = useState(value)
    if (value !== prevValue) {
        setPrevValue(value)
        setText(value)
    }
    const update = (next: string) => {
        setText(next)
        onChange(next)
    }

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
            <input
                type="search"
                value={text}
                onChange={(e) => update(e.target.value)}
                placeholder="Search albums or artists"
                aria-label="Search albums or artists"
                className="w-full h-10 pl-9 pr-9 rounded-xl border border-slate-200 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sunset/50 [&::-webkit-search-cancel-button]:hidden"
            />
            {text && (
                <button
                    type="button"
                    onClick={() => update("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    )
}

function FilterSubmenu({ label, options, selected, onToggle }: {
    label: string,
    options: string[],
    selected: string[],
    onToggle: (value: string, on: boolean) => void,
}) {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                {label}
                {selected.length > 0 && <span className="ml-auto text-xs text-sunset font-semibold">{selected.length}</span>}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="max-h-80">
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option}
                        checked={selected.includes(option)}
                        onCheckedChange={(checked) => onToggle(option, checked)}
                    >
                        {option}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}

function Chip({ label, onRemove }: { label: string, onRemove: () => void }) {
    return (
        <span className="flex items-center gap-1 pl-3 pr-1 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {label}
            <button type="button" onClick={onRemove} aria-label={`Remove ${label} filter`} className="p-0.5 rounded-full hover:bg-slate-200">
                <X className="size-3.5" />
            </button>
        </span>
    )
}
