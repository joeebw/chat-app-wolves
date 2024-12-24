import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useMultipleBlockStatus } from "@/hooks/useMultipleBlockStatus";
import { useStore } from "@/store/useStore";
import { Chat } from "@/ts/types";
import BlockedUserImg from "@/assets/blocked-user.png";

type Props = {
  chatList: Chat[] | undefined;
};

const CHAT_LIST = [
  {
    id: 1,
    name: "Ana García",
    lastMessage: "¿Nos vemos mañana para el café?",
  },
  {
    id: 2,
    name: "Juan Pérez",
    lastMessage: "El informe está listo, te lo envío ahora",
  },
  {
    id: 3,
    name: "María Rodríguez",
    lastMessage: "Gracias por la ayuda con el proyecto",
  },
  {
    id: 4,
    name: "Carlos López",
    lastMessage: "¿Tienes un momento para revisar esto?",
  },
  {
    id: 5,
    name: "Laura Martínez",
    lastMessage: "No podré asistir a la reunión de hoy",
  },
  {
    id: 6,
    name: "Diego Sánchez",
    lastMessage: "¿Viste los cambios que hice?",
  },
  {
    id: 7,
    name: "Sofia Torres",
    lastMessage: "Confirmado para el viernes",
  },
  {
    id: 8,
    name: "Pablo Ruiz",
    lastMessage: "Te envío los documentos en un momento",
  },
  {
    id: 9,
    name: "Elena Castro",
    lastMessage: "¿Podemos reagendar para la próxima semana?",
  },
  {
    id: 10,
    name: "Miguel Flores",
    lastMessage: "Ya resolví el problema del servidor",
  },
  {
    id: 11,
    name: "Carmen Díaz",
    lastMessage: "¿Has visto el nuevo diseño?",
  },
  {
    id: 12,
    name: "Roberto Morales",
    lastMessage: "Necesito tu feedback sobre esto",
  },
  {
    id: 13,
    name: "Isabel Vargas",
    lastMessage: "La presentación fue un éxito",
  },
  {
    id: 14,
    name: "Fernando Jiménez",
    lastMessage: "¿Tienes los datos actualizados?",
  },
  {
    id: 15,
    name: "Patricia Romero",
    lastMessage: "Me encantó tu propuesta",
  },
  {
    id: 16,
    name: "Alejandro Herrera",
    lastMessage: "¿Hablamos luego sobre el proyecto?",
  },
  {
    id: 17,
    name: "Victoria Luna",
    lastMessage: "Acabo de enviar el correo",
  },
  {
    id: 18,
    name: "Gabriel Mendoza",
    lastMessage: "¿Nos reunimos mañana a las 10?",
  },
];

const UserListChats = ({ chatList }: Props) => {
  const setSelectedChatId = useStore((state) => state.setSelectedChatId);
  const setSelectedUserId = useStore((state) => state.setSelectedUserId);
  const currentUserId = useStore((state) => state.currentUser?.uid);

  const blockStatuses = useMultipleBlockStatus(chatList, currentUserId!);

  const handleSelectUserIdAndChatId = (chatId: string, userId: string) => {
    setSelectedChatId(chatId);
    setSelectedUserId(userId);
  };

  return (
    <>
      {chatList?.map(
        ({ id, user: { displayName, photoURL, uid }, lastMessage }) => {
          const isBlocked = blockStatuses[id];

          return (
            <div key={id} onClick={() => handleSelectUserIdAndChatId(id, uid)}>
              <div className="flex items-center gap-4 px-6 py-4 transition-all cursor-pointer hover:bg-accent">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={isBlocked ? BlockedUserImg : photoURL} />
                  <AvatarFallback>{displayName}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-medium line-clamp-1">{displayName}</h4>
                  {/* Last message */}
                  <p className="text-sm line-clamp-1">
                    {lastMessage?.content ? (
                      lastMessage.content === "Image" ? (
                        "Image 📷"
                      ) : (
                        lastMessage.content
                      )
                    ) : (
                      <span className="text-gray-400">
                        There are no messages yet...
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          );
        }
      )}
    </>
  );
};

export default UserListChats;
