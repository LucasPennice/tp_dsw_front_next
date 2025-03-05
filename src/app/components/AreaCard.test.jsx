import { render, screen, fireEvent } from "@testing-library/react";
import AreaCard from "./AreaCard";
import "@testing-library/jest-dom";

describe("AreaCard Component", () => {
    const mockDeleteArea = jest.fn(() => Promise.resolve());
    const area = {
        id: "1",
        nombre: "Test Area",
        borradoLogico: false,
        //@ts-ignore
        materias: [{}],
    };

    it("should render area's name correctly", () => {
        render(
            <table>
                <tbody>
                    <AreaCard area={area} deleteArea={mockDeleteArea} idx={0} />
                </tbody>
            </table>
        );
        //@ts-ignore
        expect(screen.getByText("Test Area")).toBeInTheDocument();
    });
});
