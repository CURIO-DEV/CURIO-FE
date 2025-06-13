import BookmarkFolderItem from "./bookmark-folder-item";

interface Props {
  folders: {
    id: number;
    name: string;
    collaborators: string[];
    color: string;
  }[];
  selectedFolderId: number | null;
  onFolderClick: (id: number) => void;
  onFolderDelete: (id: number) => void;
  onFolderEdit: (folder: {
    id: number;
    name: string;
    color: string;
    collaborators: string[];
  }) => void;
}

export default function BookmarkFolderList({
  folders,
  selectedFolderId,
  onFolderClick,
  onFolderDelete,
  onFolderEdit,
}: Props) {
  return (
    <div className="flex min-h-47.25 flex-col items-center rounded-lg border border-gray-200 px-3.75">
      <div className="subTitle2 h-15 w-66.5 border-b border-gray-200 pt-5 pl-1.75">
        북마크
      </div>
      {folders.length === 0 ? (
        <p className="body1 mt-10.25 font-medium text-gray-300">
          폴더가 없습니다
        </p>
      ) : (
        <div className="my-4 flex flex-col gap-3">
          {folders.map((folder) => (
            <BookmarkFolderItem
              key={folder.id}
              bookmarkId={folder.id}
              name={folder.name}
              color={folder.color}
              collaborators={folder.collaborators}
              isSelected={folder.id === selectedFolderId}
              onClick={() => onFolderClick(folder.id)}
              onDelete={() => onFolderDelete(folder.id)}
              onEdit={() => onFolderEdit(folder)} // ✅ edit 핸들러 전달
            />
          ))}
        </div>
      )}
    </div>
  );
}
