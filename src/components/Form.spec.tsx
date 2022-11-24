import { render, screen, waitFor,  } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { debug } from "util"
import Form from "./Form"

describe("component test", () => {
    it("should be there and empty", () => {
        render(<Form />)
        
        expect(screen.getByPlaceholderText("Digite o nome")).toBeInTheDocument()
        expect(screen.getByText("Adicionar")).toBeInTheDocument()
        expect(screen.getByText("Adicionar")).toBeDisabled()

    })

    it("should add a name", () => {
        render(<Form />)

        const btn = screen.getByText("Adicionar")
        const input = screen.getByPlaceholderText("Digite o nome")
        userEvent.type(input, "novo nome")
        userEvent.click(btn)

        expect(screen.getByText("novo nome")).toBeInTheDocument()
    })

    it("should not add the same name", () => {
        render(<Form />)

        const btn = screen.getByText("Adicionar")
        const input = screen.getByPlaceholderText("Digite o nome")
        userEvent.type(input, "novo nome")
        userEvent.click(btn)

        expect(screen.getByText("novo nome")).toBeInTheDocument()

        userEvent.type(input, "novo nome")
        userEvent.click(btn)

        expect(screen.getByText("Este nome já foi incluido na lista")).toBeInTheDocument()
    })

    it("it should remove de msg of error", () => {
        render(<Form />)

        const btn = screen.getByText("Adicionar")
        const input = screen.getByPlaceholderText("Digite o nome")
        userEvent.type(input, "novo nome")
        userEvent.click(btn)

        expect(screen.getByText("novo nome")).toBeInTheDocument()

        userEvent.type(input, "novo nome")
        userEvent.click(btn)

        const msg = screen.getByText("Este nome já foi incluido na lista")

        expect(msg).toBeInTheDocument()

        waitFor(() => {
            expect(msg).not.toBeInTheDocument()
        })
    })
    
    it("should not pick if there is no people", () => {
        render(<Form />)

        const btn = screen.getByText("Sortear")
        expect(btn).toBeDisabled()
    })

    it("should not render if list.length % 2 != 0", () => {
        render(<Form/>)
        
        const btn = screen.getByText("Adicionar")
        const input = screen.getByPlaceholderText("Digite o nome")
        userEvent.type(input, "nome1")
        userEvent.click(btn)

        const nome1 = screen.getByText("nome1")
        expect(nome1).toBeInTheDocument()

        userEvent.type(input, "nome2")
        userEvent.click(btn)

        const nome2 = screen.getByText("nome2")
        expect(nome2).toBeInTheDocument()

        userEvent.type(input, "nome3")
        userEvent.click(btn)

        const nome3 = screen.getByText("nome3")
        expect(nome3).toBeInTheDocument()

        const btnSort = screen.getByText("Sortear")

        expect(btnSort).toBeDisabled()
    
    })

    it("should render if list.length % 2 == 0", () => {
        render(<Form/>)
        
        const btn = screen.getByText("Adicionar")
        const input = screen.getByPlaceholderText("Digite o nome")
        userEvent.type(input, "nome1")
        userEvent.click(btn)

        const nome1 = screen.getByText("nome1")
        expect(nome1).toBeInTheDocument()

        userEvent.type(input, "nome2")
        userEvent.click(btn)

        const nome2 = screen.getByText("nome2")
        expect(nome2).toBeInTheDocument()

        const btnSort = screen.getByText("Sortear")

        expect(btnSort).toBeEnabled()

        userEvent.click(btnSort)

        const nome1Show = screen.queryByText("nome1")
        const nome2Show = screen.queryByText("nome2")


        waitFor(() => {
            expect(nome1Show).toBeInTheDocument()
            expect(nome2Show).toBeInTheDocument()
        })
    
    })
    
})