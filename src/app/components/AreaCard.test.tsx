import { render, screen, fireEvent } from "@testing-library/react";
import AreaCard from "./AreaCard";
import { Area } from "../lib/definitions";
import "@testing-library/jest-dom";

describe("AreaCard Component", () => {
    const mockDeleteArea = jest.fn(() => Promise.resolve());
    const area: Area = {
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
        expect(screen.getByText("Test Area")).toBeInTheDocument();
    });

    it("should display edit button", () => {
        render(
            <table>
                <tbody>
                    <AreaCard area={area} deleteArea={mockDeleteArea} idx={0} />
                </tbody>
            </table>
        );
        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("should display delete button", () => {
        render(
            <table>
                <tbody>
                    <AreaCard area={area} deleteArea={mockDeleteArea} idx={0} />
                </tbody>
            </table>
        );
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });
});
