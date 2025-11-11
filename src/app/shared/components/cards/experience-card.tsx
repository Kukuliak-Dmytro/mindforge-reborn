// TODO: Will be refactored later
import { InputText } from "../ui/input-text"

export const ExperienceCard = () => {
    return (
            <div className="p-6 grid gap-4">
                <InputText title="Місце роботи" placeholder="Наприклад: MindForge Inc." id="workplace"></InputText>
                <div className="grid gap-4 grid-cols-2">
                    <InputText title="Посада" placeholder="Наприклад: Розробник" id="role" className="w-full"></InputText>
                    <div className="grid gap-4 grid-cols-2">
                        <InputText title="Початок" placeholder="ДД.ММ.РРРР (Наприклад: 01.01.2020)" id="start-date"></InputText>
                        <InputText title="Кінець" placeholder="ДД.ММ.РРРР (Наприклад: 01.01.2021)" id="end-date"></InputText>
                    </div>
                </div>
            </div>
    )
};