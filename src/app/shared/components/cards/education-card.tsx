// TODO: Will be refactored later
import { InputText } from "../ui/input-text";

export const EducationCard = () => {
  return (
    <div className="p-6 grid gap-4">
      <InputText
        title="Навчальний заклад"
        placeholder="MindForge Inc."
        id="workplace"></InputText>
      <InputText
        title="Фах"
        placeholder="MindForge Inc."
        id="workplace"></InputText>
      <div className="grid grid-cols-2 gap-4">
        <InputText
          title="Посада"
          placeholder="Розробник"
          id="role"
          className="grid-cols-2"></InputText>
        <div className="grid grid-cols-2 gap-4">
          <InputText
            title="Початок"
            placeholder="01.01.2020"
            id="start-date"></InputText>
          <InputText
            title="Кінець"
            placeholder="01.01.2021"
            id="end-date"></InputText>
        </div>
      </div>
    </div>
  );
};
