import flet as ft

def main(page: ft.Page):
    # Configuración de Élite (Igual que en tus ejemplos 555.PNG)
    page.title = "Neural Fit - AI"
    page.theme_mode = ft.ThemeMode.DARK
    page.bgcolor = "#050505"
    page.padding = 0
    page.window_width = 400
    page.window_height = 800

    # 1. Header Fijo (Look Tecnológico)
    header = ft.Container(
        content=ft.Row([
            ft.Text("NEURAL AI v1.2", color="#39FF14", weight="bold", size=12)
        ], alignment=ft.MainAxisAlignment.CENTER),
        padding=10,
        bgcolor="#121212",
    )

    # 2. El "Cuerpo" o Contenedor Principal (Aquí va la info de élite)
    # Este es el equivalente al "main id" que buscabas
    app_content = ft.Container(
        content=ft.Column([
            ft.Text("ANÁLISIS DE CARGA", size=20, weight="bold"),
            # Aquí agregaremos el mapa muscular y tarjetas luego
        ], scroll=ft.ScrollMode.AUTO),
        expand=True,
        padding=20
    )

    # 3. Barra de Navegación Inferior (Como en 55555.jpg)
    nav_bar = ft.NavigationBar(
        destinations=[
            ft.NavigationDestination(icon=ft.icons.HOME, label="Inicio"),
            ft.NavigationDestination(icon=ft.icons.FITNESS_CENTER, label="Entrenar"),
            ft.NavigationDestination(icon=ft.icons.PERSON, label="Perfil"),
        ],
        bgcolor="#050505",
        selected_index=0,
    )

    page.add(header, app_content, nav_bar)

ft.app(target=main)
